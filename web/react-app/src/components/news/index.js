import {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import jwtDecode from "jwt-decode";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    color: "white",
};

export const News = () => {
    const [news, setNews] = useState();

    useEffect(() => {
        fetchNews();
    }, [])

    const fetchNews = async () => {
        const fetchedNews = await fetch("http://localhost:8080/api/news");
        const news = await fetchedNews.json();

        setNews(news);
    }

    const token = localStorage.getItem("token");
    let user;
    if (token) {
        user = jwtDecode(token);
    }
    const isAdmin = user?.auth === "ROLE_ADMIN";

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between">
                <h2>Read our latest news</h2>
                {isAdmin && (
                    <button className="btn btn-primary">
                        <Link style={linkStyle} to="/admin/addNews">
                            Add news
                        </Link>
                    </button>)}
            </div>
            <div>
                {news?.map((item) => (
                    <NewsItem key={item.id} item={item} isAdmin={isAdmin} fetchNews={fetchNews} />
                ))}
            </div>
        </div>
    )
}

export default News;