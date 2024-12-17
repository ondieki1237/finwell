const dummyPosts = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  username: `User_${index + 1}`,
  post: `Here is financial advice post number ${index + 1}. Save 20% of your income, invest wisely, and budget effectively!`,
  likes: Math.floor(Math.random() * 100),
  dislikes: Math.floor(Math.random() * 20),
  isFollowed: false,
  isSubscribed: false,
}));

export default dummyPosts;
