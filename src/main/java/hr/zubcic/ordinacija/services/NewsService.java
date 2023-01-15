package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.dto.command.NewsCommand;
import hr.zubcic.ordinacija.model.News;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface NewsService {
    List<News> findAll();
    Optional<News> findById(Long id);
    Optional<News> save(NewsCommand command);
    Optional<News> update(Long id, NewsCommand command);
    void delete(Long id);
}
