"use client";

import { useState, useEffect } from "react";
import LoginPage from "@/components/login-page";
import AppLayout from "@/components/app-layout";
import { useToast } from "@/hooks/use-toast";

const initialNotes = [
  "Grocery list: Milk, Bread, Cheese, Apples",
  "Meeting notes 2024-07-29: Discuss Q3 roadmap. Project 'Phoenix' is on track. John to follow up on budget.",
  "Idea for a novel: A detective in a futuristic city discovers a conspiracy involving AI-controlled pigeons.",
  "Birthday gift ideas for Mom: A new gardening kit, a subscription to a magazine she likes, or a nice scarf.",
  "Vacation planning for Italy: Book flights to Rome, reserve a hotel in Florence, create an itinerary for Venice.",
  "Workout routine: Monday - Chest & Triceps, Wednesday - Back & Biceps, Friday - Legs & Shoulders. Cardio 30 mins after each session.",
  "Recipe for pasta carbonara: Ingredients - pancetta, eggs, pecorino cheese, black pepper, spaghetti. Instructions: cook pancetta, whisk eggs and cheese, cook pasta, combine everything.",
];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notes, setNotes] = useState<string[]>(initialNotes);
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is already authenticated when the app loads
    if (typeof chrome !== "undefined" && chrome.identity) {
        chrome.identity.getAuthToken({ interactive: false }, (token) => {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
                setIsAuthenticated(false);
            } else if (token) {
                setIsAuthenticated(true);
            }
        });
    }
  }, []);


  const handleLogin = () => {
    if (typeof chrome !== "undefined" && chrome.identity) {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          toast({
            title: "Authentication failed",
            description: chrome.runtime.lastError.message,
            variant: "destructive",
          });
          return;
        }
        if (token) {
          setIsAuthenticated(true);
          toast({
            title: "Signed in!",
            description: "You have successfully signed in.",
          });
        }
      });
    } else {
        toast({
            title: "Not in an extension",
            description: "This app is designed to run as a Chrome extension.",
            variant: "destructive",
        })
    }
  };

  const handleCreateNote = (newNote: string) => {
    if (newNote.trim()) {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setSearchResults(null);
      toast({
        title: "Note created!",
        description: "Your new note has been added.",
      });
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    const results = notes.filter((note) =>
      note.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    if (results.length === 0) {
      toast({
        title: "No notes found",
        description: "Try a different search query.",
      });
    }
  };
  
  const handleClearSearch = () => {
    setSearchResults(null);
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <AppLayout
      notes={notes}
      searchResults={searchResults}
      isLoading={false}
      onCreateNote={handleCreateNote}
      onSearch={handleSearch}
      onClearSearch={handleClearSearch}
    />
  );
}
