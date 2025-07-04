"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  category: string;
  imgUrl?: string; // Optional image URL
  author?: string; // Optional author field
  tags?: string; // Optional tags field
  createdAt: string;
  updatedAt: string;
};

export default function ContactList() {
  const [contacts, setContacts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setContacts(data);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Submitted post</h1>
      {contacts.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="border p-4 rounded">
              <p>
                <strong>Blog title:</strong> {contact.title}
              </p>
              <p>
                <strong>category:</strong> {contact.category}
              </p>
              <p>
                <strong>content:</strong> {contact.content}
              </p>
              <p>
                <strong>createdAt:</strong> {contact.createdAt}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Submitted:</strong>{" "}
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
