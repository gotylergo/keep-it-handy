import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

type NewNoteFormProps = {
  onCreateNote: (note: string) => void;
};

export default function NewNoteForm({ onCreateNote }: NewNoteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;
    if (content.trim()) {
      onCreateNote(content);
      formRef.current?.reset();
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      setIsOpen(false);
    }
  };

  const handleTextareaInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <Accordion type="single" collapsible className="w-full" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="p-0 hover:no-underline">
            <div className="flex w-full items-center justify-start rounded-md border border-dashed p-3 text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground transition-colors">
                <PlusCircle className="h-5 w-5 mr-2" />
                <span>Create a new note</span>
            </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              ref={textareaRef}
              name="content"
              placeholder="Take a note..."
              className="min-h-[60px] max-h-48"
              onInput={handleTextareaInput}
            />
            <div className="flex justify-end">
              <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90">Save Note</Button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
