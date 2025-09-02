import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarInset,
  SidebarGroup,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, X } from "lucide-react";
import NewNoteForm from "./new-note-form";
import NoteCard from "./note-card";
import SearchBar from "./search-bar";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

type AppLayoutProps = {
  notes: string[];
  searchResults: string[] | null;
  isLoading: boolean;
  onCreateNote: (note: string) => void;
  onSearch: (query: string) => void;
  onClearSearch: () => void;
};

export default function AppLayout({
  notes,
  searchResults,
  isLoading,
  onCreateNote,
  onSearch,
  onClearSearch,
}: AppLayoutProps) {
  const notesToDisplay = searchResults ?? notes;

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="inset" collapsible="icon" className="border-none shadow-2xl bg-sidebar">
        <SidebarHeader className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Lightbulb className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Keep It Handy</span>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden"/>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <div className="flex flex-col gap-4 p-3">
            <SearchBar onSearch={onSearch} isLoading={isLoading} />
            <NewNoteForm onCreateNote={onCreateNote} />
          </div>
          <SidebarSeparator />
          <ScrollArea className="h-[calc(100vh-210px)]">
            <SidebarGroup>
              {searchResults && (
                <div className="flex justify-between items-center mb-2 px-2">
                  <p className="text-sm font-medium">Search Results</p>
                  <Button variant="ghost" size="sm" onClick={onClearSearch} className="flex items-center gap-1">
                    Clear <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4">
                {isLoading && (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))
                )}
                {!isLoading &&
                  notesToDisplay.map((note, index) => (
                    <NoteCard key={index} note={note} />
                  ))}
              </div>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-muted-foreground">Keep It Handy</h2>
              <p className="text-muted-foreground">Your notes are available in the side panel.</p>
              <p className="text-sm text-muted-foreground/80 mt-2">Try pressing <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>B
              </kbd> to toggle the panel.</p>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
