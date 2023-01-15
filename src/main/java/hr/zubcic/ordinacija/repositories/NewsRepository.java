package hr.zubcic.ordinacija.repositories;

import hr.zubcic.ordinacija.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
}
