package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.dto.command.NewsCommand;
import hr.zubcic.ordinacija.model.News;
import hr.zubcic.ordinacija.repositories.NewsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;

    public NewsServiceImpl(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Override
    public List<News> findAll() {
        return newsRepository.findAll();
    }

    @Override
    public Optional<News> findById(Long id) {
        return newsRepository.findById(id);
    }

    @Override
    public Optional<News> save(NewsCommand command) {
        News news = mapCommandToNews(command);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm");
        String date = formatter.format(LocalDateTime.now());
        news.setDate(date);

        newsRepository.save(news);
        return Optional.of(news);
    }

    @Override
    public Optional<News> update(Long id, NewsCommand command) {
        News news = newsRepository.findById(id).get();

        news.setTitle(command.getTitle());
        news.setDescription(command.getDescription());
        news.setImage(command.getImage());

        newsRepository.save(news);
        return Optional.of(news);
    }

    @Override
    public void delete(Long id) {
        newsRepository.deleteById(id);
    }

    private News mapCommandToNews(final NewsCommand newsCommand) {
        News news = new News();

        news.setTitle(newsCommand.getTitle());
        news.setDescription(newsCommand.getDescription());
        news.setImage(newsCommand.getImage());

        return news;
    }
}
