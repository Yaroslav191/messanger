type Message = {
  id: string;
  message: string;
  created_at: number;
  userame: string;
  profileImage: string;
  email: string;
};

type MessageResponse = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: [];
  $updatedAt: string;
  id: string;
  message: string;
};

type MessagesResponse = {
  documents: MessageResponse[];
  total: number;
};
