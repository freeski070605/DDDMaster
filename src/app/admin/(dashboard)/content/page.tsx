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

      <SettingsForm settings={settings as SiteSettings} />

      <CollectionManager
        title="Gallery"
        description="Add event portfolio entries with categories, venues, and photos. This is the quickest way to refresh the public gallery."
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
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "text" },
          { name: "category", label: "Category", type: "select", options: [...eventTypes] },
          { name: "venue", label: "Venue", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Main image", type: "image" },
          { name: "beforeImage", label: "Before image", type: "image" },
          { name: "afterImage", label: "After image", type: "image" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />

      <CollectionManager
        title="Testimonials"
        description="Manage reviews, ratings, and client photo-backed feedback shown on the site."
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
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "rating", label: "Rating", type: "number" },
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />

      <CollectionManager
        title="Services"
        description="Manage service pages, images, and starting investments."
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
          { name: "slug", label: "Slug", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "category", label: "Category", type: "select", options: [...eventTypes] },
          { name: "description", label: "Description", type: "textarea" },
          { name: "shortDescription", label: "Short description", type: "textarea" },
          { name: "startingPrice", label: "Starting price", type: "number" },
          { name: "idealFor", label: "Ideal for", type: "textarea" },
          { name: "includes", label: "Includes", type: "tags" },
          { name: "image", label: "Image", type: "image" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />

      <CollectionManager
        title="Packages"
        description="Update package tiers, starting prices, and add-ons."
        collection="packages"
        items={packages as Array<Record<string, unknown>>}
        emptyItem={{
          name: "",
          slug: "",
          startingPrice: 0,
          description: "",
          highlights: "",
          addOns: "",
          bestFor: "",
          featured: false,
        }}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "slug", label: "Slug", type: "text" },
          { name: "startingPrice", label: "Starting price", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "highlights", label: "Highlights", type: "tags" },
          { name: "addOns", label: "Add-ons", type: "tags" },
          { name: "bestFor", label: "Best for", type: "text" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />

      <CollectionManager
        title="FAQs"
        description="Update FAQ entries shown across the site."
        collection="faqs"
        items={faqs as Array<Record<string, unknown>>}
        emptyItem={{
          question: "",
          answer: "",
          featured: false,
        }}
        fields={[
          { name: "question", label: "Question", type: "textarea" },
          { name: "answer", label: "Answer", type: "textarea" },
          { name: "featured", label: "Featured", type: "checkbox" },
        ]}
      />
    </div>
  );
}
