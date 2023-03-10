package hr.zubcic.ordinacija.repositories;

import hr.zubcic.ordinacija.model.Appointment;
import hr.zubcic.ordinacija.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findAppointmentByPatient(User patient);
    List<Appointment> findAllByDoctor(User doctor);
}
