const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove individual background elements
content = content.replace(/<\s*div[^>]*className="absolute inset-0 bg-center bg-cover"[^>]*style={{ backgroundImage: `url\("\${encodeURI\(DETAILS_BACKGROUND_IMAGE\)}"\)` }}[^>]*\/>/g, '');
content = content.replace(/<\s*div[^>]*className="absolute inset-0 bg-center bg-cover"[^>]*style={{ backgroundImage: `url\("\${encodeURI\(TIMELINE_BACKGROUND_IMAGE\)}"\)` }}[^>]*\/>/g, '');
content = content.replace(/<\s*div[^>]*className="absolute inset-0 bg-center bg-cover"[^>]*style={{ backgroundImage: `url\("\${encodeURI\(WISHES_BACKGROUND_IMAGE\)}"\)` }}[^>]*\/>/g, '');

// 2. Remove 'bg-white' from the section tags starting from line 824 (DETAILS) to WISHES to make them transparent
content = content.replace(/<section className="relative py-28 md:py-48 overflow-hidden bg-white">/g, '<section className="relative py-28 md:py-48 overflow-hidden">');
content = content.replace(/<section className="relative py-32 md:py-48 flex flex-col items-center overflow-hidden bg-white">/g, '<section className="relative py-32 md:py-48 flex flex-col items-center overflow-hidden">');
content = content.replace(/<section className="w-full bg-[#f8fafc] py-20 md:py-32">/g, '<section className="w-full py-20 md:py-32">');

// 3. Add the wrapper after the Countdown section end
const countdownEnd = `            </section>

            <section className="relative py-28 md:py-48 overflow-hidden">`;

const wrappedStart = `            </section>

            <div 
              className="relative w-full bg-center bg-cover bg-fixed"
              style={{ backgroundImage: \`url("\${encodeURI(DETAILS_BACKGROUND_IMAGE)}")\` }}
            >
            <section className="relative py-28 md:py-48 overflow-hidden">`;

content = content.replace(countdownEnd, wrappedStart);

// 4. Close the wrapper before the footer
const footerStart = `            {/* Footer */}`;
const wrappedEnd = `            </div>

            {/* Footer */}`;

content = content.replace(footerStart, wrappedEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated App.tsx to use one background wrapper.');
