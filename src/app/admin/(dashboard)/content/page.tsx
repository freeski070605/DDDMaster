import { CollectionManager } from "@/components/admin/collection-manager";
import { SettingsForm } from "@/components/admin/settings-form";
import { Card, CardContent } from "@/components/ui/card";
import { eventTypes } from "@/data/seed-content";
import { getAdminCollectionItems, getSiteSettings } from "@/lib/cms";
import type { SiteSettings } from "@/types/content";

export default async function AdminContentPage() {
  const [settings, gallery, testimonials, packages, faqs, services] = await Promise.all([
    getSiteSettings(),
    getAdminCollectionItems("gallery"),
    getAdminCollectionItems("testimonials"),
    getAdminCollectionItems("packages"),
    getAdminCollectionItems("faqs"),
    getAdminCollectionItems("services"),
  ]);

  return (
    <div className="space-y-6">
      <Card className="bg-[linear-gradient(135deg,rgba(117,87,150,0.14),rgba(211,184,140,0.2))]">
        <CardContent className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
              Website editor
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[color:var(--foreground)]">
              Update your homepage, gallery, and reviews from one place
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--muted-foreground)]">
              Use the homepage settings to change the main page images and section text.
              Use gallery and testimonials below for photo and review CRUD operations.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                Homepage images
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">
                Hero image plus both showcase photos are editable.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                Gallery CRUD
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">
                Add, edit, search, and delete portfolio items.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                Testimonial CRUD
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">
                Manage photos, quotes, ratings, and featured reviews.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/75 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
                Larger controls
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--foreground)]">
                Grouped sections and bigger touch targets help with easier editing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/88">
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
              Quick navigation
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[color:var(--foreground)]">
              Choose what you want to edit
            </h2>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
              Each button takes you to a section of the site content. The text under each
              section explains where those changes show up on the live website.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              ["#homepage-settings", "Homepage text and images"],
              ["#gallery-content", "Gallery photos"],
              ["#testimonials-content", "Testimonials and reviews"],
              ["#services-content", "Services"],
              ["#packages-content", "Packages"],
              ["#faqs-content", "FAQs"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full bg-[color:var(--secondary)] px-5 py-3 text-sm font-semibold text-[color:var(--secondary-foreground)] ring-1 ring-[color:var(--border)] transition hover:bg-[color:var(--secondary)]/80"
              >
                {label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div id="homepage-settings" className="scroll-mt-24">
        <SettingsForm settings={settings as SiteSettings} />
      </div>

      <CollectionManager
        sectionId="gallery-content"
        title="Gallery"
        description="Add event portfolio entries with categories, venues, and photos. This is the quickest way to refresh the public gallery."
        whereItShows={["Gallery page", "Homepage gallery previews"]}
        collection="gallery"
        items={gallery as Array<Record<string, unknown>>}
        emptyItem={{
          title: "",
          slug: "",
          category: "Wedding",
          venue: "",
          description: "",
          image: "",
          beforeImage: "",
          afterImage: "",
          featured: false,
        }}
        fields={[
          { name: "title", label: "Gallery title", type: "text", placeholder: "Romantic ballroom reception" },
          {
            name: "slug",
            label: "Page link name (slug)",
            type: "text",
            helper: "This creates the internal page link. Use short lowercase words with dashes.",
            placeholder: "romantic-ballroom-reception",
          },
          {
            name: "category",
            label: "Event type",
            type: "select",
            options: [...eventTypes],
            helper: "This helps visitors filter the gallery.",
          },
          { name: "venue", label: "Venue or location", type: "text", placeholder: "Center City ballroom" },
          {
            name: "description",
            label: "Short description",
            type: "textarea",
            helper: "This appears under the gallery image on the live site.",
            placeholder: "A warm, candlelit setup with layered neutrals and soft florals.",
          },
          {
            name: "image",
            label: "Main image",
            type: "image",
            helper: "This is the main photo visitors see in the gallery.",
          },
          {
            name: "beforeImage",
            label: "Before image",
            type: "image",
            helper: "Optional. Use this if you want to keep a setup-before photo with the item.",
          },
          {
            name: "afterImage",
            label: "After image",
            type: "image",
            helper: "Optional. Use this if you want to keep a finished reveal photo with the item.",
          },
          { name: "featured", label: "Featured", type: "checkbox", helper: "Featured items can appear on the homepage." },
        ]}
      />

      <CollectionManager
        sectionId="testimonials-content"
        title="Testimonials"
        description="Manage reviews, ratings, and client photo-backed feedback shown on the site."
        whereItShows={["Homepage testimonials", "Testimonials page"]}
        collection="testimonials"
        items={testimonials as Array<Record<string, unknown>>}
        emptyItem={{
          name: "",
          role: "",
          rating: 5,
          quote: "",
          image: "",
          featured: false,
        }}
        fields={[
          { name: "name", label: "Client name", type: "text", placeholder: "Alyssa R." },
          { name: "role", label: "Client label", type: "text", helper: "Example: Bride, Philadelphia", placeholder: "Bride, Philadelphia" },
          { name: "rating", label: "Star rating", type: "number", helper: "Use 1 through 5." },
          {
            name: "quote",
            label: "Review text",
            type: "textarea",
            helper: "Only add real client feedback here.",
            placeholder: "Working with the team felt easy and the room looked incredible.",
          },
          { name: "image", label: "Client photo", type: "image", helper: "This photo appears with the testimonial." },
          { name: "featured", label: "Featured", type: "checkbox", helper: "Featured reviews can appear on the homepage." },
        ]}
      />

      <CollectionManager
        sectionId="services-content"
        title="Services"
        description="Manage service pages, images, and starting investments."
        whereItShows={["Homepage services", "Services page", "Individual service pages"]}
        collection="services"
        items={services as Array<Record<string, unknown>>}
        emptyItem={{
          slug: "",
          title: "",
          category: "Wedding",
          description: "",
          shortDescription: "",
          startingPrice: 0,
          idealFor: "",
          includes: "",
          image: "",
          featured: false,
        }}
        fields={[
          { name: "slug", label: "Page link name (slug)", type: "text", helper: "Use short lowercase words with dashes.", placeholder: "weddings" },
          { name: "title", label: "Service title", type: "text", placeholder: "Weddings" },
          { name: "category", label: "Service category", type: "select", options: [...eventTypes] },
          { name: "description", label: "Full service description", type: "textarea" },
          { name: "shortDescription", label: "Short homepage description", type: "textarea", helper: "This shorter version appears on service cards." },
          { name: "startingPrice", label: "Starting price", type: "number", helper: "Numbers only." },
          { name: "idealFor", label: "Ideal for", type: "textarea" },
          { name: "includes", label: "What is included", type: "tags", helper: "Add one included item per line." },
          { name: "image", label: "Service image", type: "image", helper: "This image appears on the homepage and services pages." },
          { name: "featured", label: "Featured", type: "checkbox", helper: "Featured services can appear on the homepage." },
        ]}
      />

      <CollectionManager
        sectionId="packages-content"
        title="Packages"
        description="Update package tiers, package photos, starting prices, and add-ons."
        whereItShows={["Packages page", "Homepage package section"]}
        collection="packages"
        items={packages as Array<Record<string, unknown>>}
        emptyItem={{
          name: "",
          slug: "",
          startingPrice: 0,
          description: "",
          image: "",
          highlights: "",
          addOns: "",
          bestFor: "",
          featured: false,
        }}
        fields={[
          { name: "name", label: "Package name", type: "text", placeholder: "Luxe Celebration" },
          { name: "slug", label: "Page link name (slug)", type: "text", helper: "Use short lowercase words with dashes.", placeholder: "luxe-celebration" },
          { name: "startingPrice", label: "Starting price", type: "number", helper: "Numbers only." },
          { name: "description", label: "Package description", type: "textarea" },
          { name: "image", label: "Package image", type: "image", helper: "This image appears on the packages page and homepage package section." },
          { name: "highlights", label: "Package highlights", type: "tags", helper: "Add one highlight per line." },
          { name: "addOns", label: "Optional add-ons", type: "tags", helper: "Add one add-on per line." },
          { name: "bestFor", label: "Best for", type: "text", placeholder: "Large showers and upscale birthdays" },
          { name: "featured", label: "Featured", type: "checkbox", helper: "Use this when you want to highlight a popular package." },
        ]}
      />

      <CollectionManager
        sectionId="faqs-content"
        title="FAQs"
        description="Update FAQ entries shown across the site."
        whereItShows={["Homepage FAQ section", "FAQ page", "SEO markup"]}
        collection="faqs"
        items={faqs as Array<Record<string, unknown>>}
        emptyItem={{
          question: "",
          answer: "",
          featured: false,
        }}
        fields={[
          { name: "question", label: "Question", type: "textarea", placeholder: "How far in advance should I book?" },
          { name: "answer", label: "Answer", type: "textarea", placeholder: "We recommend booking 8 to 12 weeks in advance for larger events." },
          { name: "featured", label: "Featured", type: "checkbox", helper: "Featured FAQs can appear on the homepage." },
        ]}
      />
    </div>
  );
}
