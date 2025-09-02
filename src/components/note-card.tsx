import { Card, CardContent } from "@/components/ui/card";

type NoteCardProps = {
  note: string;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 break-words">
      <CardContent className="p-4">
        <p className="text-sm text-foreground whitespace-pre-wrap">{note}</p>
      </CardContent>
    </Card>
  );
}
