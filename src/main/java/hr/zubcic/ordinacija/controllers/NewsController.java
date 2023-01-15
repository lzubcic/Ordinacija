package hr.zubcic.ordinacija.controllers;

import hr.zubcic.ordinacija.dto.command.NewsCommand;
import hr.zubcic.ordinacija.model.News;
import hr.zubcic.ordinacija.services.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<List<News>> getNews() {
        return ResponseEntity.status(HttpStatus.OK).body(newsService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getById(@PathVariable Long id)  {
        return newsService.findById(id)
                .map(
                        news -> ResponseEntity
                                .status(HttpStatus.FOUND)
                                .body(news)
                )
                .orElseGet(
                        () -> ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .build()
                );
    }

    @PostMapping
    public ResponseEntity<News> save(@Valid @RequestBody final NewsCommand command) {
        return newsService.save(command)
                .map(
                        news -> ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(news)
                )
                .orElseGet(
                        () -> ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> update(@PathVariable Long id, @Valid @RequestBody final NewsCommand command) {
        return newsService.update(id, command)
                .map(
                        (news) -> ResponseEntity
                                .status(HttpStatus.OK)
                                .body(news)
                )
                .orElseGet(
                        () -> ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        newsService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(id);
    }
}
