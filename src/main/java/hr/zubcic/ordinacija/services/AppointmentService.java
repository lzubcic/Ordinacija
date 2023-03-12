package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.dto.AppointmentDTO;
import hr.zubcic.ordinacija.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface AppointmentService {

    List<AppointmentDTO> findAll();

    Optional<AppointmentDTO> findById(Long id);

    Optional<AppointmentDTO> findAppointmentByPatient(User patient);
    List<AppointmentDTO> findAllByDoctor(User doctor);

    Optional<AppointmentDTO> save(AppointmentDTO appointment);

    Optional<AppointmentDTO> accept(Long id);

    Optional<AppointmentDTO> cancel(Long id);

    Optional<AppointmentDTO> update(Long id, AppointmentDTO appointment);

    Optional<Long> delete(Long id);
}
