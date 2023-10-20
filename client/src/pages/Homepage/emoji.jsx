import React from "react";

const emojis = ["😀", "😂", "😅", "😍", "👍", "👋", "🎉"];

function EmojiPicker({ onSelect }) {
  return (
    <div className="emoji-picker">
      <div className="emoji-list">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="emoji"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EmojiPicker;
