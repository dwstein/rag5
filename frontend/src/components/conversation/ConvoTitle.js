import React, { useState, useEffect, useRef } from "react";
import { useConversation } from '../../context/ConversationContext';

const ConvoTitle = () => {
  const { conversationId, conversationTitle, updateConversationTitle, setConversations } = useConversation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(conversationTitle || "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      setEditedTitle(conversationTitle || "");
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value || "");
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
  };

  const handleTitleBlur = () => {
    handleTitleSave();
  };

  const handleTitleSave = async () => {
    if (editedTitle !== conversationTitle) {
        try {
            await updateConversationTitle(editedTitle);
            setConversations((prevConversations) =>
              prevConversations.map((conversation) =>
                conversation.id === conversationId ? { ...conversation, title: editedTitle } : conversation
              )
            );
          } catch (error) {
            console.error('Error updating conversation title:', error);
          }
    }
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          className="title is-4"
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
          onBlur={handleTitleBlur}
        />
      ) : (
        <h1 className="title is-4" onClick={handleTitleClick}>
          {conversationTitle}
        </h1>
      )}
    </>
  );
};

export default ConvoTitle;
