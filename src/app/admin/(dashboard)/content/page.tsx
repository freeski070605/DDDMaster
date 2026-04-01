import { CollectionManager } from "@/components/admin/collection-manager";
import { SettingsForm } from "@/components/admin/settings-form";
import { eventTypes } from "@/data/seed-content";
import {
  getAdminCollectionItems,
  getSiteSettings,
} from "@/lib/cms";

export default async function AdminContentPage() {
  const [settings, gallery, testimonials, packages, faqs, services] =
    await Promise.all([
      getSiteSettings(),
      getAdminCollectionItems("gallery"),
      getAdminCollectionItems("testimonials"),
      getAdminCollectionItems("packages"),
      getAdminCollectionItems("faqs"),
      getAdminCollectionItems("services"),
    ]);

  return (
    <div className="space-y-6">
      <SettingsForm settings={settings as Record<string, unknown>} />
      <CollectionManager
        title="Services"
        description="Manage service pages and starting investments."
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
        title="Gallery"
        description="Add event portfolio entries with categories, venues, and photos."
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
        description="Manage reviews, ratings, and client photo-backed feedback."
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
        title="FAQs"
        description="Update SEO-friendly FAQ entries shown across the site."
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
