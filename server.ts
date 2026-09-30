import 'dotenv/config';
import express from 'express';
import path from 'path';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import {
  insertEnquiryIntoSupabase,
  testSupabaseConnection,
  getSupabaseConfigStatus,
} from './src/server/supabase';
import {
  authenticateAdmin,
  requireAdminAuth,
} from './src/server/auth';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  setPropertyArchiveStatus,
  deleteProperty,
  savePropertyPhoto,
} from './src/server/propertyStore';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

const PORT = 3000;
const PRIMARY_DESTINATION_EMAIL = process.env.DESTINATION_EMAIL || 'shreesaideveloper.in@gmail.com';
const FALLBACK_DESTINATION_EMAIL = 'ssdofficial0001@gmail.com';
const DESTINATION_EMAILS = [PRIMARY_DESTINATION_EMAIL, FALLBACK_DESTINATION_EMAIL].filter(
  (email, idx, self) => Boolean(email) && self.indexOf(email) === idx
);

async function startServer() {
  const app = express();

  // Middleware for parsing JSON and form submissions
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Shree Sai Developers API',
      destinationEmails: DESTINATION_EMAILS,
      supabase: getSupabaseConfigStatus(),
      smtpConfigured: Boolean(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      web3formsConfigured: Boolean(process.env.WEB3FORMS_ACCESS_KEY),
    });
  });

  // Diagnostic Endpoint: Check Supabase connection and enquiries table
  app.get('/api/supabase/status', async (req, res) => {
    const status = await testSupabaseConnection();
    res.json(status);
  });

  // Diagnostic Endpoint: Verify Supabase insert with a test submission
  app.post('/api/supabase/verify', async (req, res) => {
    const testPayload = {
      name: 'Test Verification Visitor',
      phone: '+91 98674 78525',
      email: 'verified@shreesaideveloper.in',
      requirement: 'Supabase Connection Verification',
      location: 'Mumbai & MMR',
      propertyType: 'Residential',
      message: 'Automated test to confirm Supabase enquiries table connection',
      source: 'System Connection Test',
    };

    const result = await insertEnquiryIntoSupabase(testPayload);
    res.json({
      tested: true,
      timestamp: new Date().toISOString(),
      result,
    });
  });

  // API Route: Form Enquiry Submission -> Verified Supabase Database Insertion
  app.post('/api/enquire', async (req, res) => {
    try {
      const {
        fullName,
        name,
        ownerName,
        phone,
        email,
        requirement,
        requirementType,
        serviceInterest,
        preferredLocation,
        location,
        propertyLocation,
        propertyInterest,
        propertyType,
        bhk,
        budget,
        budgetOrArea,
        monthlyBudget,
        expectedPrice,
        area,
        approximateArea,
        message,
        additionalRequirements,
        additionalDetails,
        source,
      } = req.body;

      // 1. Mandatory Supabase Database Insert (Strict - Never fakes success)
      const supabaseResult = await insertEnquiryIntoSupabase(req.body);

      if (!supabaseResult.success) {
        console.error('[Supabase Insertion Error]:', supabaseResult.error);
        return res.status(500).json({
          success: false,
          error: 'SUPABASE_INSERTION_FAILED',
          message:
            supabaseResult.error ||
            'Unable to save enquiry to the database. Please verify Supabase configuration or contact us directly.',
          details: supabaseResult.details,
        });
      }

      console.log('[Supabase Confirmed] Successfully recorded enquiry with ID:', supabaseResult.id);

      const clientName = fullName || name || ownerName || 'Valued Client';
      const clientPhone = phone || 'Not provided';
      const clientEmail = email || 'Not provided';
      const clientReq = requirement || requirementType || serviceInterest || 'General Enquiry';
      const clientInterest = propertyInterest || 'Shree Sai Developers Property';
      const clientLocation = preferredLocation || location || propertyLocation || 'Mumbai / MMR';
      const clientPropertyType = propertyType || 'Residential / Commercial';
      const clientBHK = bhk || 'N/A';
      const clientBudget = budget || budgetOrArea || monthlyBudget || expectedPrice || 'As discussed';
      const clientArea = area || approximateArea || 'N/A';
      const clientMessage = message || additionalRequirements || additionalDetails || 'No additional message provided';

      const subject = `[Shree Sai Developers] New Enquiry [DB #${supabaseResult.id || 'NEW'}]: ${clientReq} - ${clientName}`;

      // Secondary Email Notifications (Dispatched in background after Supabase confirms record)
      (async () => {
        try {
          const plainText = `
NEW PROPERTY ENQUIRY (CONFIRMED IN SUPABASE #${supabaseResult.id || 'N/A'}) — SHREE SAI DEVELOPERS

==================================================
DATABASE RECORD ID: ${supabaseResult.id || 'Confirmed'}
REQUIREMENT: ${clientReq}
PROPERTY / INTEREST: ${clientInterest}
==================================================

CLIENT DETAILS:
- Full Name: ${clientName}
- Phone Number: ${clientPhone}
- Email Address: ${clientEmail}

PROPERTY PREFERENCES:
- Location: ${clientLocation}
- Type: ${clientPropertyType}
- BHK / Configuration: ${clientBHK}
- Budget / Area: ${clientBudget}
- Approx Area: ${clientArea}

MESSAGE / NOTES:
${clientMessage}

==================================================
Submitted via: ${source || 'Shree Sai Developers Web Portal'}
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
Recipient Inboxes: ${DESTINATION_EMAILS.join(', ')}
==================================================
`;

          // SMTP Email Notification
          const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
          const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || PRIMARY_DESTINATION_EMAIL;
          const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

          if (smtpPass) {
            const isGmail = smtpHost.includes('gmail.com');
            const transporter = nodemailer.createTransport(
              isGmail
                ? {
                    service: 'gmail',
                    auth: { user: smtpUser, pass: smtpPass },
                  }
                : {
                    host: smtpHost,
                    port: Number(process.env.SMTP_PORT) || 465,
                    secure: process.env.SMTP_SECURE !== 'false',
                    auth: { user: smtpUser, pass: smtpPass },
                  }
            );

            await transporter.sendMail({
              from: `"Shree Sai Developers Portal" <${smtpUser}>`,
              to: DESTINATION_EMAILS.join(', '),
              replyTo: clientEmail !== 'Not provided' ? clientEmail : undefined,
              subject,
              text: plainText,
            });
            console.log('[Email Notice] Delivered via SMTP to', DESTINATION_EMAILS.join(', '));
          }
        } catch (emailErr) {
          console.warn('[Secondary Email Dispatch Notice]:', emailErr);
        }
      })();

      // Return confirmed success with Supabase record ID
      return res.status(200).json({
        success: true,
        message: 'Your enquiry has been successfully registered in our verified database. Our advisory desk will contact you shortly.',
        enquiryId: supabaseResult.id,
        savedToSupabase: true,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Fatal error processing enquiry:', error);
      return res.status(500).json({
        success: false,
        error: 'Unable to process enquiry. Please connect via WhatsApp or Call directly.',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  // ==========================================
  // PUBLIC PROPERTIES API (Published & Non-Archived Only)
  // ==========================================
  app.get('/api/properties', async (req, res) => {
    try {
      const properties = await getProperties({ includeArchived: false, includeUnpublished: false });
      res.json({ success: true, count: properties.length, properties });
    } catch (err: any) {
      console.error('[API Properties Error]:', err);
      res.status(500).json({ success: false, error: 'Failed to fetch properties' });
    }
  });

  app.get('/api/properties/:id', async (req, res) => {
    try {
      const property = await getPropertyById(req.params.id, false);
      if (!property) {
        return res.status(404).json({ success: false, error: 'Property not found or unavailable' });
      }
      res.json({ success: true, property });
    } catch (err: any) {
      console.error('[API Property Detail Error]:', err);
      res.status(500).json({ success: false, error: 'Failed to fetch property details' });
    }
  });

  // ==========================================
  // ADMIN AUTHENTICATION API
  // ==========================================
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const authResult = await authenticateAdmin(email, password);
      if (!authResult.success) {
        return res.status(401).json({
          success: false,
          error: 'AUTH_FAILED',
          message: authResult.error || 'Invalid admin credentials.',
        });
      }
      return res.json({
        success: true,
        token: authResult.token,
        email: authResult.email,
        role: 'admin',
      });
    } catch (err: any) {
      console.error('[Admin Login Error]:', err);
      res.status(500).json({ success: false, error: 'Authentication processing error' });
    }
  });

  app.get('/api/admin/me', requireAdminAuth, (req, res) => {
    const adminUser = (req as any).adminUser;
    res.json({
      success: true,
      authenticated: true,
      user: {
        email: adminUser?.email,
        role: adminUser?.role || 'admin',
      },
    });
  });

  app.post('/api/admin/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // ==========================================
  // PROTECTED ADMIN PROPERTY MANAGEMENT API
  // ==========================================
  // Get all properties (including unpublished and archived)
  app.get('/api/admin/properties', requireAdminAuth, async (req, res) => {
    try {
      const properties = await getProperties({ includeArchived: true, includeUnpublished: true });
      res.json({ success: true, count: properties.length, properties });
    } catch (err: any) {
      console.error('[Admin Get Properties Error]:', err);
      res.status(500).json({ success: false, error: 'Failed to load property inventory' });
    }
  });

  // Add new property
  app.post('/api/admin/properties', requireAdminAuth, async (req, res) => {
    try {
      const { name, location, listingType, description, coverImage, images, status, featured, published } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, error: 'Property Name is required.' });
      }
      if (!location || !location.trim()) {
        return res.status(400).json({ success: false, error: 'Location is required.' });
      }
      if (!description || !description.trim()) {
        return res.status(400).json({ success: false, error: 'Description is required.' });
      }

      const created = await createProperty({
        name,
        location,
        listingType: listingType || 'Buy',
        description,
        coverImage,
        images: Array.isArray(images) ? images : [],
        status: status || 'Available',
        featured: Boolean(featured),
        published: published !== false,
      });

      res.status(201).json({
        success: true,
        message: 'Property created successfully.',
        property: created,
      });
    } catch (err: any) {
      console.error('[Admin Create Property Error]:', err);
      res.status(500).json({ success: false, error: err.message || 'Failed to create property' });
    }
  });

  // Edit existing property
  app.put('/api/admin/properties/:id', requireAdminAuth, async (req, res) => {
    try {
      const updated = await updateProperty(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Property not found.' });
      }
      res.json({
        success: true,
        message: 'Property updated successfully.',
        property: updated,
      });
    } catch (err: any) {
      console.error('[Admin Update Property Error]:', err);
      res.status(500).json({ success: false, error: err.message || 'Failed to update property' });
    }
  });

  // Archive / unarchive property
  app.post('/api/admin/properties/:id/archive', requireAdminAuth, async (req, res) => {
    try {
      const isArchived = req.body.isArchived !== false;
      const updated = await setPropertyArchiveStatus(req.params.id, isArchived);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Property not found.' });
      }
      res.json({
        success: true,
        message: isArchived ? 'Property archived successfully.' : 'Property restored from archive.',
        property: updated,
      });
    } catch (err: any) {
      console.error('[Admin Archive Property Error]:', err);
      res.status(500).json({ success: false, error: 'Failed to update archive status' });
    }
  });

  // Delete property (safe archive by default, permanent if ?permanent=true)
  app.delete('/api/admin/properties/:id', requireAdminAuth, async (req, res) => {
    try {
      const permanent = req.query.permanent === 'true';
      const result = await deleteProperty(req.params.id, permanent);
      res.json(result);
    } catch (err: any) {
      console.error('[Admin Delete Property Error]:', err);
      res.status(500).json({ success: false, error: 'Failed to delete property' });
    }
  });

  // Upload property photos (supports multiple photos, original quality)
  app.post('/api/admin/upload', requireAdminAuth, upload.array('photos', 15), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, error: 'No image files uploaded.' });
      }

      const results = [];
      for (const file of files) {
        const saved = await savePropertyPhoto(file);
        results.push(saved);
      }

      res.json({
        success: true,
        message: `Successfully uploaded ${results.length} photo(s).`,
        photos: results,
      });
    } catch (err: any) {
      console.error('[Admin Photo Upload Error]:', err);
      res.status(500).json({ success: false, error: err.message || 'Image upload failed' });
    }
  });

  // Always serve public directory directly for static assets (logos, images, favicons)
  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware in development vs Static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shree Sai Developers server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

