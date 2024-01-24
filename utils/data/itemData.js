import { clientCredentials } from '../client';

const getMenuItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getItemsByIds = async (itemIds) => {
  try {
    // Fetch all menu items
    const allMenuItems = await getMenuItems();

    // Filter menu items based on item IDs
    const foundItems = itemIds.map((itemId) => allMenuItems.find((item) => item.id === itemId)).filter(Boolean);

    return foundItems;
  } catch (error) {
    console.error('Error fetching items by ID:', error);
    throw error;
  }
};

export { getMenuItems, getItemsByIds };
