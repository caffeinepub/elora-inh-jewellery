# ELORA.INH Jewellery

## Current State
Rebuild from scratch. Previous version had jewellery catalog with admin panel, WhatsApp ordering, and Instagram integration.

## Requested Changes (Diff)

### Add
- Full jewellery product catalog (anti-tarnish, alloy brass, stainless steel)
- Admin panel at `/admin` protected by password "Elora.inh"
- Product management: add/edit/delete with image upload from gallery
- WhatsApp order button on every product linked to +91 9496623220
- Instagram footer link to @elora.inh
- Persistent product storage via blob-storage (products survive draft restarts)
- Upload progress feedback during image upload

### Modify
- N/A (fresh rebuild)

### Remove
- N/A

## Implementation Plan
1. Use blob-storage component for image persistence and authorization for admin access
2. Backend: store products (name, description, price, category, imageId) in stable storage
3. Backend: CRUD APIs for products, admin authentication with password
4. Frontend: public catalog page with beige/brown elegant theme
5. Frontend: product grid with WhatsApp order button per product
6. Frontend: admin panel with password gate, product form with image upload
7. Footer with Instagram link
