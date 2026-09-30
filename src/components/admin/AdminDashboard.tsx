import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Lock,
  LogOut,
  Plus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Archive,
  Eye,
  EyeOff,
  Star,
  UploadCloud,
  X,
  Edit3,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';
import {
  ManagedProperty,
  PropertyPhotoItem,
  ListingType,
  PropertyStatus,
  AdminUser,
} from '../../types';
import {
  adminLogin,
  verifyAdminSession,
  adminLogout,
  fetchAdminProperties,
  createPropertyListing,
  updatePropertyListing,
  togglePropertyArchive,
  deletePropertyListing,
  uploadPropertyPhotos,
} from '../../services/propertyService';
import { PREFERRED_LOCATIONS } from '../../data/propertyData';

interface AdminDashboardProps {
  onBackToWebsite: () => void;
  onViewPropertyDetail: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToWebsite,
  onViewPropertyDetail,
}) => {
  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Property Inventory State
  const [properties, setProperties] = useState<ManagedProperty[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | ListingType>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | PropertyStatus>('all');
  const [showArchived, setShowArchived] = useState(false);

  // Active View / Form State
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit'>('list');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  // Form Fields (Strictly Supported Fields Only)
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formCustomLocation, setFormCustomLocation] = useState('');
  const [formListingType, setFormListingType] = useState<ListingType>('Buy');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<PropertyStatus>('Available');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formPublished, setFormPublished] = useState(true);
  const [formPhotos, setFormPhotos] = useState<PropertyPhotoItem[]>([]);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');

  // Upload & Submission State
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check existing session on mount
  useEffect(() => {
    verifyAdminSession().then((session) => {
      if (session.authenticated && session.user) {
        setIsAdminAuthenticated(true);
        setAdminUser(session.user);
        loadInventory();
      } else {
        setIsAdminAuthenticated(false);
      }
    });
  }, []);

  const loadInventory = async () => {
    setLoadingProperties(true);
    try {
      const data = await fetchAdminProperties();
      setProperties(data);
    } catch (err: any) {
      if (err.message === 'UNAUTHORIZED') {
        setIsAdminAuthenticated(false);
        setAdminUser(null);
      } else {
        showFeedback('error', 'Failed to load property inventory.');
      }
    } finally {
      setLoadingProperties(false);
    }
  };

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    const res = await adminLogin(loginEmail, loginPassword);
    setLoginLoading(false);

    if (res.success && res.user) {
      setIsAdminAuthenticated(true);
      setAdminUser(res.user);
      loadInventory();
    } else {
      setLoginError(res.error || 'Invalid credentials. Please verify email and password.');
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await adminLogout();
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    setViewMode('list');
  };

  // Open Add Form
  const handleOpenAdd = () => {
    setEditingPropertyId(null);
    setFormName('');
    setFormLocation('Vasai');
    setFormCustomLocation('');
    setFormListingType('Buy');
    setFormDescription('');
    setFormStatus('Available');
    setFormFeatured(false);
    setFormPublished(true);
    setFormPhotos([]);
    setCoverPhotoUrl('');
    setViewMode('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Edit Form
  const handleOpenEdit = (prop: ManagedProperty) => {
    setEditingPropertyId(prop.id);
    setFormName(prop.name);
    if (PREFERRED_LOCATIONS.includes(prop.location as any)) {
      setFormLocation(prop.location);
      setFormCustomLocation('');
    } else {
      setFormLocation('Other Location');
      setFormCustomLocation(prop.location);
    }
    setFormListingType(prop.listingType || 'Buy');
    setFormDescription(prop.description || '');
    setFormStatus(prop.status || 'Available');
    setFormFeatured(Boolean(prop.featured));
    setFormPublished(Boolean(prop.published));
    setFormPhotos(prop.images || []);
    setCoverPhotoUrl(prop.coverImage || (prop.images?.[0]?.url ?? ''));
    setViewMode('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingPhotos(true);
    try {
      const fileArray: File[] = Array.from(files);
      const uploaded = await uploadPropertyPhotos(fileArray);

      const newPhotos: PropertyPhotoItem[] = uploaded.map((u, i) => ({
        id: `upload-${Date.now()}-${i}`,
        url: u.url,
        title: u.originalname,
        isCover: false,
      }));

      setFormPhotos((prev) => {
        const combined = [...prev, ...newPhotos];
        if (!coverPhotoUrl && combined.length > 0) {
          setCoverPhotoUrl(combined[0].url);
        }
        return combined;
      });

      showFeedback('success', `Uploaded ${uploaded.length} photo(s) successfully.`);
    } catch (err: any) {
      showFeedback('error', err.message || 'Image upload failed.');
    } finally {
      setIsUploadingPhotos(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSetCoverPhoto = (url: string) => {
    setCoverPhotoUrl(url);
    setFormPhotos((prev) =>
      prev.map((p) => ({
        ...p,
        isCover: p.url === url,
      }))
    );
  };

  const handleRemovePhoto = (index: number) => {
    setFormPhotos((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (coverPhotoUrl === prev[index]?.url && updated.length > 0) {
        setCoverPhotoUrl(updated[0].url);
      }
      return updated;
    });
  };

  // Submit Property (Add or Edit)
  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalLocation =
      formLocation === 'Other Location' ? formCustomLocation.trim() || 'Mumbai & MMR' : formLocation;

    if (!formName.trim()) {
      showFeedback('error', 'Property Name is required.');
      return;
    }
    if (!finalLocation) {
      showFeedback('error', 'Location is required.');
      return;
    }
    if (!formDescription.trim()) {
      showFeedback('error', 'Description is required.');
      return;
    }

    const payload: Partial<ManagedProperty> = {
      name: formName.trim(),
      location: finalLocation,
      listingType: formListingType,
      description: formDescription.trim(),
      status: formStatus,
      featured: formFeatured,
      published: formPublished,
      images: formPhotos,
      coverImage: coverPhotoUrl || formPhotos[0]?.url || '/3.png',
    };

    setIsSaving(true);
    try {
      if (viewMode === 'add') {
        const created = await createPropertyListing(payload);
        showFeedback('success', `Property "${created.name}" created successfully.`);
      } else if (viewMode === 'edit' && editingPropertyId) {
        const updated = await updatePropertyListing(editingPropertyId, payload);
        showFeedback('success', `Property "${updated.name}" updated successfully.`);
      }

      await loadInventory();
      setViewMode('list');
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save property listing.');
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Published
  const handleTogglePublish = async (prop: ManagedProperty) => {
    try {
      await updatePropertyListing(prop.id, { published: !prop.published });
      setProperties((prev) =>
        prev.map((p) => (p.id === prop.id ? { ...p, published: !p.published } : p))
      );
      showFeedback(
        'success',
        `Property "${prop.name}" is now ${!prop.published ? 'Published (Live)' : 'Unpublished (Draft)'}.`
      );
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to change publish status.');
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (prop: ManagedProperty) => {
    try {
      await updatePropertyListing(prop.id, { featured: !prop.featured });
      setProperties((prev) =>
        prev.map((p) => (p.id === prop.id ? { ...p, featured: !p.featured } : p))
      );
      showFeedback(
        'success',
        `Property "${prop.name}" ${!prop.featured ? 'marked as Featured' : 'unfeatured'}.`
      );
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to change featured status.');
    }
  };

  // Archive / Restore
  const handleToggleArchive = async (prop: ManagedProperty) => {
    const willArchive = !prop.isArchived;
    const confirmText = willArchive
      ? `Archive "${prop.name}"? It will be hidden from the public website but safely kept in your records.`
      : `Restore "${prop.name}" from archive?`;

    if (!window.confirm(confirmText)) return;

    try {
      await togglePropertyArchive(prop.id, willArchive);
      setProperties((prev) =>
        prev.map((p) => (p.id === prop.id ? { ...p, isArchived: willArchive } : p))
      );
      showFeedback('success', willArchive ? `Property archived safely.` : `Property restored.`);
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to update archive status.');
    }
  };

  // Safe Deletion
  const handleDelete = async (prop: ManagedProperty) => {
    const isSeed = prop.id === 'shree-sai-apartment' || prop.id === 'boisar-property';
    const message = isSeed
      ? `"${prop.name}" is a verified core company property. It will be safely unlisted/archived rather than permanently deleted.`
      : `Are you sure you want to permanently delete "${prop.name}"? This action cannot be undone.`;

    if (!window.confirm(message)) return;

    try {
      await deletePropertyListing(prop.id, !isSeed);
      setProperties((prev) => prev.filter((p) => p.id !== prop.id));
      showFeedback('success', isSeed ? 'Property safely archived.' : 'Property removed.');
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to remove property.');
    }
  };

  // ==========================================
  // 1. LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (isAdminAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#0C2340]/20">
        <div className="max-w-md w-full card-hw bg-[#ffffff] border border-[#e8e8e8] p-6 sm:p-8 rounded-[4px] shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-[4px] bg-[#FDFDFD] border border-[#e8e8e8] flex items-center justify-center text-[#0C2340]">
              <Lock className="w-6 h-6 stroke-[2]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
              Protected Admin Portal
            </h1>
            <p className="text-xs text-[#666666]">
              SHREE SAI DEVELOPERS &bull; Property Management
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 rounded-[4px] text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wider">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="ssdofficial0001@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] rounded-[4px] text-xs text-[#1A1A1A] focus:border-[#0C2340] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] rounded-[4px] text-xs text-[#1A1A1A] focus:border-[#0C2340] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full btn-hw-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 stroke-[2]" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-[#e8e8e8] flex justify-between items-center text-[11px] text-[#666666]">
            <button
              type="button"
              onClick={onBackToWebsite}
              className="hover:text-[#0C2340] cursor-pointer inline-flex items-center gap-1 font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </button>
            <span>Secure Authentication</span>
          </div>
        </div>
      </div>
    );
  }

  // Loading initial auth state
  if (isAdminAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#0C2340] animate-spin" />
      </div>
    );
  }

  // Filtered Properties List
  const filteredProperties = properties.filter((p) => {
    if (!showArchived && p.isArchived) return false;
    if (showArchived && !p.isArchived) return false;

    if (filterType !== 'all' && p.listingType !== filterType) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] flex flex-col selection:bg-[#0C2340]/20">
      {/* Feedback Toast */}
      {feedbackMessage && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-[4px] border shadow-hw-deep flex items-center gap-3 text-xs max-w-sm animate-in slide-in-from-top-3 ${
            feedbackMessage.type === 'success'
              ? 'bg-[#ffffff] border-emerald-500 text-emerald-800'
              : 'bg-[#ffffff] border-rose-500 text-rose-800'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span className="flex-1 font-semibold">{feedbackMessage.text}</span>
          <button onClick={() => setFeedbackMessage(null)} className="text-[#666666] hover:text-[#1A1A1A] cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e8e8e8] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToWebsite}
              className="p-1.5 text-[#666666] hover:text-[#0C2340] transition-colors rounded-[4px] cursor-pointer"
              title="Return to Public Site"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block truncate">
                Admin Dashboard
              </span>
              <h1 className="text-sm sm:text-base font-bold text-[#1A1A1A] truncate">
                SHREE SAI DEVELOPERS &bull; Inventory
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {adminUser && (
              <span className="hidden md:inline text-[11px] text-[#666666] px-2.5 py-1 bg-[#FDFDFD] border border-[#e8e8e8] rounded-[4px] truncate max-w-[200px] font-medium">
                {adminUser.email}
              </span>
            )}

            {viewMode === 'list' && (
              <button
                onClick={handleOpenAdd}
                className="btn-hw-primary inline-flex items-center gap-1.5 py-2 px-3 text-xs"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2]" />
                <span className="hidden sm:inline">Add Property</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="p-2 text-[#666666] hover:text-rose-600 border border-[#e8e8e8] hover:border-rose-300 bg-[#FDFDFD] rounded-[4px] transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {/* ==========================================
            VIEW: ADD / EDIT PROPERTY FORM
           ========================================== */}
        {viewMode === 'add' || viewMode === 'edit' ? (
          <div className="max-w-3xl mx-auto card-hw bg-[#ffffff] border border-[#e8e8e8] p-6 sm:p-8 rounded-[4px] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#e8e8e8] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold block">
                  {viewMode === 'add' ? 'New Property Entry' : 'Edit Listing Specifications'}
                </span>
                <h2 className="text-xl font-bold text-[#1A1A1A] mt-0.5">
                  {viewMode === 'add' ? 'Add Property to Inventory' : `Edit: ${formName || 'Property'}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="text-xs text-[#666666] hover:text-[#1A1A1A] px-3 py-1.5 border border-[#e8e8e8] rounded-[4px] cursor-pointer hover:bg-[#FDFDFD] font-medium"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmitProperty} className="space-y-5">
              {/* Field 1: Property Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  Property Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shree Sai Residency, Sai Heights, Boisar Property"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none transition-colors"
                />
              </div>

              {/* Field 2: Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Location / Area <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none transition-colors cursor-pointer"
                  >
                    {PREFERRED_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-[#ffffff] text-[#1A1A1A]">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {formLocation === 'Other Location' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      Specify Custom Location <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Palghar West, Nalasopara East"
                      value={formCustomLocation}
                      onChange={(e) => setFormCustomLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Field 3: Listing Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Listing Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formListingType}
                    onChange={(e) => setFormListingType(e.target.value as ListingType)}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Buy" className="bg-[#ffffff] text-[#1A1A1A]">Buy (For Sale)</option>
                    <option value="Sell" className="bg-[#ffffff] text-[#1A1A1A]">Sell (Exclusive Listing)</option>
                    <option value="Rent" className="bg-[#ffffff] text-[#1A1A1A]">Rent (Lease)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Current Status <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as PropertyStatus)}
                    className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Available" className="bg-[#ffffff] text-[#1A1A1A]">Available (Ready for Enquiries)</option>
                    <option value="Sold" className="bg-[#ffffff] text-[#1A1A1A]">Sold</option>
                    <option value="Rented" className="bg-[#ffffff] text-[#1A1A1A]">Rented</option>
                    <option value="Unavailable" className="bg-[#ffffff] text-[#1A1A1A]">Unavailable</option>
                  </select>
                </div>
              </div>

              {/* Field 4: Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  Property Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide verified structural specifications, location advantages, connectivity, municipal certificates, and construction details..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none transition-colors"
                />
              </div>

              {/* Field 5: Property Photos Upload */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Property Photos ({formPhotos.length})
                  </label>
                  <span className="text-[11px] text-[#666666]">Original quality retained</span>
                </div>

                {/* Upload Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#e8e8e8] hover:border-[#0C2340] p-6 rounded-[4px] bg-[#FDFDFD] text-center cursor-pointer transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isUploadingPhotos ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 text-[#0C2340] animate-spin" />
                      <span className="text-xs text-[#0C2340] font-bold">Uploading and processing photos...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <UploadCloud className="w-8 h-8 text-[#0C2340]" />
                      <p className="text-xs font-bold text-[#1A1A1A]">
                        Click or drag real property photos to upload
                      </p>
                      <p className="text-[11px] text-[#666666]">
                        Supports multiple PNG, JPG, or WEBP photos (up to 15MB each)
                      </p>
                    </div>
                  )}
                </div>

                {/* Photo Previews */}
                {formPhotos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {formPhotos.map((photo, idx) => {
                      const isCover = coverPhotoUrl === photo.url;
                      return (
                        <div
                          key={photo.id || idx}
                          className={`relative aspect-[4/3] rounded-[4px] overflow-hidden border group bg-[#FDFDFD] ${
                            isCover ? 'border-[#0C2340] ring-2 ring-[#0C2340]' : 'border-[#e8e8e8]'
                          }`}
                        >
                          <img
                            src={photo.url}
                            alt={photo.title || `Photo ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />

                          {/* Cover Badge */}
                          {isCover && (
                            <span className="absolute top-1.5 left-1.5 bg-[#0C2340] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] shadow-xs uppercase tracking-wider">
                              Cover
                            </span>
                          )}

                          {/* Action Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetCoverPhoto(photo.url)}
                                className="px-2 py-1 bg-[#0C2340] text-white text-[10px] font-bold rounded-[4px] cursor-pointer shadow-xs"
                                title="Set as primary cover"
                              >
                                Set Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="p-1.5 bg-rose-600 text-white rounded-[4px] hover:bg-rose-700 cursor-pointer shadow-xs"
                              title="Remove photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Field 6 & 7: Featured & Published Toggles */}
              <div className="pt-3 border-t border-[#e8e8e8] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-3 bg-[#FDFDFD] border border-[#e8e8e8] rounded-[4px] cursor-pointer hover:border-[#0C2340] transition-colors">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#0C2340] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1A1A1A] block">Featured Listing</span>
                    <span className="text-[10px] text-[#666666] block">Highlight in top sections</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-[#FDFDFD] border border-[#e8e8e8] rounded-[4px] cursor-pointer hover:border-[#0C2340] transition-colors">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 accent-[#0C2340] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1A1A1A] block">Published (Live)</span>
                    <span className="text-[10px] text-[#666666] block">Visible to public visitors</span>
                  </div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#e8e8e8] flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-5 py-2.5 bg-[#ffffff] hover:bg-[#FDFDFD] text-[#666666] hover:text-[#1A1A1A] rounded-[4px] text-xs font-semibold border border-[#e8e8e8] transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploadingPhotos}
                  className="btn-hw-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Listing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2]" />
                      <span>{viewMode === 'add' ? 'Publish Property' : 'Save Changes'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* ==========================================
              VIEW: PROPERTIES LIST / INVENTORY
             ========================================== */
          <div className="space-y-6">
            {/* Filter and Control Bar */}
            <div className="card-hw bg-[#ffffff] border border-[#e8e8e8] p-4 rounded-[4px] space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2 stroke-[2]" />
                  <input
                    type="text"
                    placeholder="Search properties by name, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#1A1A1A]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-[#ffffff] border border-[#e8e8e8] focus:border-[#0C2340] rounded-[4px] text-xs text-[#1A1A1A] focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="Rented">Rented</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>

                  <button
                    onClick={() => setShowArchived(!showArchived)}
                    className={`px-3 py-1.5 rounded-[4px] text-xs font-bold border transition-colors cursor-pointer ${
                      showArchived
                        ? 'bg-[#0C2340] text-white border-[#0C2340]'
                        : 'bg-[#ffffff] text-[#666666] border-[#e8e8e8] hover:text-[#1A1A1A] hover:bg-[#FDFDFD]'
                    }`}
                  >
                    {showArchived ? 'Viewing Archived' : 'Active Listings'}
                  </button>

                  <button
                    onClick={loadInventory}
                    disabled={loadingProperties}
                    className="p-2 bg-[#ffffff] border border-[#e8e8e8] hover:border-[#0C2340] text-[#666666] hover:text-[#0C2340] rounded-[4px] transition-colors cursor-pointer"
                    title="Refresh Inventory"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingProperties ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Inventory List */}
            {loadingProperties ? (
              <div className="py-20 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#0C2340] animate-spin mx-auto" />
                <p className="text-xs text-[#666666]">Loading inventory database...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="py-16 text-center space-y-4 card-hw bg-[#ffffff] border border-[#e8e8e8] p-8 rounded-[4px] shadow-xs">
                <Building2 className="w-10 h-10 text-[#666666] mx-auto stroke-[1.5]" />
                <h3 className="text-base font-bold text-[#1A1A1A]">No properties found</h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  {showArchived
                    ? 'There are no archived properties currently.'
                    : searchTerm || filterType !== 'all' || filterStatus !== 'all'
                    ? 'Try clearing your search filters to view listings.'
                    : 'Click "Add Property" above to create your first new listing.'}
                </p>
                {!showArchived && (
                  <button
                    onClick={handleOpenAdd}
                    className="btn-hw-primary inline-flex items-center gap-1.5 py-2 px-4 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Property</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProperties.map((prop) => {
                  return (
                    <div
                      key={prop.id}
                      className="card-hw bg-[#ffffff] border border-[#e8e8e8] hover:border-[#0C2340] rounded-[4px] overflow-hidden flex flex-col transition-colors group shadow-xs hover:shadow-hw-high"
                    >
                      {/* Card Cover Photo */}
                      <div className="relative aspect-[16/10] bg-[#FDFDFD] overflow-hidden">
                        <img
                          src={prop.coverImage || '/3.png'}
                          alt={prop.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] shadow-xs border ${
                              prop.published
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30'
                            }`}
                          >
                            {prop.published ? 'Live' : 'Draft'}
                          </span>
                          {prop.featured && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#0C2340] text-white shadow-xs">
                              Featured
                            </span>
                          )}
                          {prop.isArchived && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-700 border border-slate-300 shadow-xs">
                              Archived
                            </span>
                          )}
                        </div>

                        {/* Status Badge */}
                        <div className="absolute bottom-2.5 right-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-[#ffffff]/90 text-[#1A1A1A] border border-[#e8e8e8] shadow-xs">
                            {prop.status}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-[#C5A059] mb-1">
                            <span className="font-bold uppercase tracking-wider">For {prop.listingType}</span>
                            <span className="text-[#666666]">{prop.images?.length || 1} Photo(s)</span>
                          </div>
                          <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight line-clamp-1">
                            {prop.name}
                          </h3>
                          <p className="text-xs text-[#666666] mt-0.5 line-clamp-1">{prop.location}</p>
                          <p className="text-xs text-[#666666] mt-2 line-clamp-2 leading-relaxed">
                            {prop.description}
                          </p>
                        </div>

                        {/* Quick Controls Bar */}
                        <div className="pt-3 border-t border-[#e8e8e8] space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            {/* Live View link */}
                            <button
                              type="button"
                              onClick={() => onViewPropertyDetail(prop.id)}
                              className="inline-flex items-center gap-1 text-[11px] text-[#0C2340] hover:text-[#C5A059] transition-colors cursor-pointer font-bold"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Detail Page</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>

                            {/* Toggles */}
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleFeatured(prop)}
                                className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                                  prop.featured
                                    ? 'text-[#C5A059] hover:text-[#0C2340]'
                                    : 'text-[#666666] hover:text-[#1A1A1A]'
                                }`}
                                title={prop.featured ? 'Unmark featured' : 'Mark as featured'}
                              >
                                <Star className={`w-3.5 h-3.5 ${prop.featured ? 'fill-current' : ''}`} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleTogglePublish(prop)}
                                className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                                  prop.published
                                    ? 'text-emerald-600 hover:text-emerald-700'
                                    : 'text-[#666666] hover:text-[#1A1A1A]'
                                }`}
                                title={prop.published ? 'Unpublish (make draft)' : 'Publish (make live)'}
                              >
                                {prop.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* Primary Edit / Archive / Delete Action Row */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(prop)}
                              className="flex-1 py-1.5 px-3 bg-[#FDFDFD] hover:bg-[#ffffff] text-[#1A1A1A] border border-[#e8e8e8] rounded-[4px] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3 text-[#0C2340]" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleArchive(prop)}
                              className="p-1.5 text-[#666666] hover:text-[#0C2340] border border-[#e8e8e8] hover:border-[#0C2340] rounded-[4px] transition-colors cursor-pointer bg-white"
                              title={prop.isArchived ? 'Restore property' : 'Archive property safely'}
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(prop)}
                              className="p-1.5 text-[#666666] hover:text-rose-600 border border-[#e8e8e8] hover:border-rose-300 rounded-[4px] transition-colors cursor-pointer bg-white"
                              title="Delete listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
