Tathastu Sustainables — IMAGE FOLDER
=======================================

Drop your real photos into this folder using EXACTLY these file names.
Until a file exists, the site automatically shows a matching forest-green
leaf placeholder — nothing breaks, and nothing else needs editing.
The moment you add the real file, it appears. Just refresh the page.

Recommended: JPG, under 400 KB each, sRGB.


HOME PAGE (index.html)
----------------------
hero-forest-leaf.jpg      Big hero background. 1920x1080 landscape.
story-artisan.jpg         Artisan sorting/handling leaves. 1200x900.
story-pressing.jpg        Heat-pressing machine in action. 1200x900.
cat-plates.jpg            Stack of plates. Square, 800x800.
cat-bowls.jpg             Bowls together. Square, 800x800.
cat-container.jpg         Container with its lid. Square, 800x800.
cat-toothbrush.jpg        Toothbrushes. Square, 800x800.


PRODUCTS PAGE (products.html)
-----------------------------
banner-products.jpg       Page banner background. 1920x700.

sample-kit.jpg            Sample kit — one of every product. Square, 800x800.

Plates (square, 800x800 each):
plate-7.jpg               7 inch plate
plate-8.jpg               8 inch plate
plate-12.jpg              12 inch plate
plate-14.jpg              14 inch plate

Bowls (square, 800x800 each):
bowl-3.5.jpg              3.5 inch bowl
bowl-4.jpg                4 inch bowl
bowl-5.jpg                5 inch bowl
bowl-6.jpg                6 inch bowl

Container (square, 800x800):
container-500.jpg         500 ml container + lid

Toothbrush (square, 800x800 each):
brush-c.jpg               C-curve toothbrush
brush-s.jpg               S-curve toothbrush
brush-combo.jpg           Family combo pack


GALLERY PAGE (gallery.html)
---------------------------
banner-gallery.jpg        Page banner background. 1920x700.
unit-floor.jpg            Wide view of the production floor. 1200x900.

Gallery/                  All photo-grid tiles live in this subfolder.
                          Plain pictures, no captions — just drop a photo
                          in and add one <figure> block (see below).


CONTACT PAGE (contact.html)
---------------------------
banner-contact.jpg        Page banner background. 1920x700.


ADDING MORE GALLERY PHOTOS
--------------------------
Drop the photo into images/Gallery/, then open gallery.html and copy
one of the existing blocks inside <div class="gallery-grid">:

  <figure class="gal reveal">
    <img src="images/Gallery/your-file.jpg" data-seed="NN" alt="Describe the photo">
  </figure>

Give it a data-seed number that isn't used by another tile (any unused
integer works). No caption, no title — the gallery is pictures only.
The lightbox (click to enlarge, arrow keys to browse) picks it up
automatically, no other changes needed.
