package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.dto.UserDTO;
import hr.zubcic.ordinacija.dto.command.UserCommand;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    List<UserDTO> findAll();
    Optional<UserDTO> findById(Long id);
    Optional<UserDTO> findByUsername(String username);
    Optional<UserDTO> save(UserCommand command);
    Optional<UserDTO> update(Long id, UserCommand updateUser);

    Optional<Long> delete(Long id);
}
