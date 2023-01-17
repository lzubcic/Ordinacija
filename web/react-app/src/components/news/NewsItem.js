import {Card, Modal} from "react-bootstrap";
import {useState} from "react";
import EditNews from "../admin/news/EditNews";
import {newsService} from "../../services/news.service";

const NewsItem = ({item, isAdmin, fetchNews}) => {
    const [showModal, setShowModal] = useState(false);
    const onSave = async () => {
        setShowModal(false);
        await fetchNews();
    }

    const onDelete = async () => {
        await newsService.deleteNews(item.id);
        await fetchNews();
    }

    return (
        <Card className="my-3">
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text><small className="text-muted">{item.date}</small></Card.Text>
                {isAdmin && (
                    <>
                        <button className="btn btn-warning me-2" onClick={() => setShowModal(true)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => {
                            window.confirm("Are you sure you want to delete " + item.title + "?") && onDelete()
                        }}>Delete</button>
                    </>
                )}
            </Card.Body>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit news</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditNews news={item} onSave={onSave} />
                </Modal.Body>
            </Modal>
        </Card>
    )
}

export default NewsItem;