export const submitData = async (api, datas) => {
  try {
    console.log(`API Endpoint: ${api}`);
    console.log('Data submitted:', datas);
    return {response: " Data successfully submitted"}; // Simply return the data passed
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
