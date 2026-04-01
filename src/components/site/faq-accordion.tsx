import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion({
  items,
}: {
  items: Array<{ _id?: string; question: string; answer: string }>;
}) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem key={item._id ?? item.question} value={`${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
