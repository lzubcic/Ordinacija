package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.dto.AppointmentDTO;
import hr.zubcic.ordinacija.model.Appointment;
import hr.zubcic.ordinacija.model.User;
import hr.zubcic.ordinacija.repositories.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserService userService;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, UserService userService) {
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }

    @Override
    public List<AppointmentDTO> findAll() {
        return appointmentRepository.findAll().stream().map(this::mapAppointmentToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<AppointmentDTO> findById(Long id) {
        return appointmentRepository.findById(id).map(this::mapAppointmentToDTO);
    }

    @Override
    public Optional<AppointmentDTO> findAppointmentByPatient(User patient) {
        return appointmentRepository.findAppointmentByPatient(patient).map(this::mapAppointmentToDTO);
    }

    @Override
    public List<AppointmentDTO> findAllByDoctor(User doctor) {
        return appointmentRepository.findAllByDoctor(doctor).stream().map(this::mapAppointmentToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<AppointmentDTO> save(AppointmentDTO dto) {
        Appointment appointment = mapDTOToAppointment(dto);
        appointmentRepository.save(appointment);
        return Optional.of(mapAppointmentToDTO(appointment));
    }

    @Override
    public Optional<AppointmentDTO> update(Long id, AppointmentDTO dto) {
        Appointment appointment = mapDTOToAppointment(dto);
        Appointment appointment1 = appointmentRepository.findById(id).get();
        appointment1.setAppointmentStatus(appointment.getAppointmentStatus());
        appointment1.setAppointmentType(appointment.getAppointmentType());
        appointment1.setDescription(appointment.getDescription());
        appointment1.setDoctor(appointment.getDoctor());
        appointment1.setPatient(appointment.getPatient());
        appointment1.setSchedule(appointment.getSchedule());
        appointmentRepository.save(appointment1);
        return Optional.of(mapAppointmentToDTO(appointment1));
    }

    @Override
    public Optional<Long> delete(Long id) {
        appointmentRepository.deleteById(id);
        return Optional.of(id);
    }

    public Appointment mapDTOToAppointment(AppointmentDTO dto) {
        Appointment appointment = new Appointment();

        appointment.setAppointmentType(dto.getAppointmentType());
        appointment.setAppointmentStatus(dto.getAppointmentStatus());
        appointment.setSchedule(formatDate(dto.getSchedule()));
        appointment.setDescription(dto.getDescription());
        appointment.setDoctor(userService.mapDTOToUser(userService.findById(dto.getDoctorId()).get()));
        appointment.setPatient(userService.mapDTOToUser(userService.findById(dto.getPatientId()).get()));

        return appointment;
    }

    public AppointmentDTO mapAppointmentToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();

        dto.setId(appointment.getId());
        dto.setAppointmentType(appointment.getAppointmentType());
        dto.setAppointmentStatus(appointment.getAppointmentStatus());
        dto.setSchedule(dateToString(appointment.getSchedule()));
        dto.setDescription(appointment.getDescription());
        dto.setDoctorId(appointment.getDoctor().getId());
        dto.setPatientId(appointment.getPatient().getId());

        return dto;
    }

    private LocalDateTime formatDate(String strDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm");
        return LocalDateTime.parse(strDate, formatter);
    }

    private String dateToString(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy. HH:mm");
        LocalDateTime dateTime = LocalDateTime.of(date.getYear(), date.getMonth(), date.getDayOfMonth(), date.getHour(), date.getMinute());
        return dateTime.format(formatter);
    }
}
