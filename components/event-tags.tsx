import React from "react";

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <span key={tag} className="pill">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default EventTags;
