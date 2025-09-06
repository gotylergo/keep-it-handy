import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { FormEvent } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
  isLoading: boolean;
};

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        name="search"
        placeholder="Search notes..."
        className="pl-10 h-11 text-base bg-background/70"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-16 text-muted-foreground hover:text-foreground"
        disabled={isLoading}
        variant="ghost"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
