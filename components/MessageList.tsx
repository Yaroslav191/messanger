'use client';

import { databases } from '@/appwrite';
import React, { useEffect, useState } from 'react';

const MessageList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const datas = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      );
      setData(datas);
    };

    getMessages();
  }, []);

  console.log(data);

  return <div>MessageList</div>;
};

export default MessageList;
