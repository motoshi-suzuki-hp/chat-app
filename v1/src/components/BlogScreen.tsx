import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './BlogScreen.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


interface BlogPost {
  title: string;
  date: string;
  image: string;
}

const BlogScreen: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/blogposts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: BlogPost[] = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="blog-screen">
      {blogPosts.map((post, index) => (
        <div key={index} className="blog-post">
            <div className="blog-image">
                <img src={post.image} alt={post.title} className="blog-image" />
            </div>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
        </div>

      ))}

      <div className="blog-see-more">
        <a href="https://www.nogizaka46.com/s/n46/diary/MEMBER/list?ima=2612&ct=55385">
            <FontAwesomeIcon icon={faAngleRight} />
            <p>SEE MORE</p>
        </a>
      </div>
    </div>
  );
};

export default BlogScreen;
