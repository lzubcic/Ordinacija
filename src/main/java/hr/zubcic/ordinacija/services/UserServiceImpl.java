package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.dto.UserDTO;
import hr.zubcic.ordinacija.dto.command.UserCommand;
import hr.zubcic.ordinacija.model.Authority;
import hr.zubcic.ordinacija.model.User;
import hr.zubcic.ordinacija.repositories.AuthorityRepository;
import hr.zubcic.ordinacija.repositories.UserRepository;
import hr.zubcic.ordinacija.services.exceptions.UsernameExistsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;

    public UserServiceImpl(UserRepository userRepository, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().filter((user -> !user.getUsername().equals("admin") )).map(this::mapUserToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> findById(Long id) {
        return userRepository.findById(id).map(this::mapUserToDTO);
    }

    @Override
    public Optional<UserDTO> findByUsername(String username) {
        return userRepository.findOneByUsername(username).map(this::mapUserToDTO);
    }

    @Override
    public Optional<UserDTO> save(UserCommand command) {
        if (userRepository.findOneByUsername(command.getUsername()).isPresent()) {
            throw new UsernameExistsException();
        }
        User user = mapCommandToUser(command);
        Set<Authority> authorities = new HashSet<>();
        authorities.add(authorityRepository.findAuthorityByName("ROLE_USER").get());
        user.setAuthorities(authorities);
        userRepository.save(user);
        return Optional.of(mapUserToDTO(user));
    }

    @Override
    public Optional<UserDTO> update(Long id, UserCommand updateUser) {

        User user = userRepository.findById(id).get();
        user.setUsername(updateUser.getUsername());
        user.setFirstName(updateUser.getFirstName());
        user.setLastName(updateUser.getLastName());
        userRepository.save(user);
        return Optional.of(mapUserToDTO(user));
    }

    @Override
    public Optional<Long> delete(Long id) {
        userRepository.deleteById(id);
        return Optional.of(id);
    }

    @Override
    public User mapDTOToUser(final UserDTO dto) {
        User user = new User();

        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAuthorities(dto.getAuthorities().stream().map(Authority::new).collect(Collectors.toSet()));

        return user;
    }

    private UserDTO mapUserToDTO(final User user){
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setAuthorities(user.getAuthorities().stream().map(Authority::getName).collect(Collectors.toSet()));

        return userDTO;
    }

    private User mapCommandToUser(final UserCommand command) {
        User user = new User();

        user.setUsername(command.getUsername());
        user.setPassword(encoder().encode(command.getPassword()));
        user.setFirstName(command.getFirstName());
        user.setLastName(command.getLastName());

        return user;
    }
}
