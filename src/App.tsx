import { useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import fetchingImg from "/data-fetching.png";

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    const fetchPosts = async () => {
      try {
        const posts = await get("https://jsonplaceholder.typicode.com/sosts");
        setPosts(posts as BlogPost[]);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setPosts([]);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();

    return () => undefined;
  }, []);

  return (
    <main>
      <img
        src={fetchingImg}
        alt="An abstract image depicting a data fetching process."
      />
      {isLoading ? <p>Loading...</p> : <BlogPosts posts={posts} />}
      {!isLoading && !posts.length && <p>{error}</p>}
    </main>
  );
}

export default App;
