package hr.zubcic.ordinacija.controllers;

import hr.zubcic.ordinacija.dto.AppointmentDTO;
import hr.zubcic.ordinacija.dto.UserDTO;
import hr.zubcic.ordinacija.model.User;
import hr.zubcic.ordinacija.services.AppointmentService;
import hr.zubcic.ordinacija.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final UserService userService;

    public AppointmentController(AppointmentService appointmentService, UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAppointments(@RequestParam(required = false) Long doctorId, @RequestParam(required = false) Long patientId) {
        if (doctorId != null) {
            UserDTO doctorDTO = userService.findById(doctorId).get();
            User doctor = userService.mapDTOToUser(doctorDTO);
            return ResponseEntity.status(HttpStatus.OK).body(appointmentService.findAllByDoctor(doctor));
        }
        else if (patientId != null) {
            UserDTO patientDTO = userService.findById(patientId).get();
            User patient = userService.mapDTOToUser(patientDTO);
            return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonList(appointmentService.findAppointmentByPatient(patient).get()));
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(appointmentService.findAll());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getById(@PathVariable Long id) {
        return appointmentService.findById(id)
                .map(
                        appointment -> ResponseEntity
                                .status(HttpStatus.FOUND)
                                .body(appointment)
                )
                .orElseGet(
                        () -> ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .build()
                );
    }

    @PostMapping
    public ResponseEntity<AppointmentDTO> save(@RequestBody final AppointmentDTO dto) {
        return appointmentService.save(dto)
                .map(
                        savedAppointment -> ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(savedAppointment)
                )
                .orElseGet(
                        () -> ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDTO> update(@PathVariable Long id, @RequestBody AppointmentDTO dto) {
        return appointmentService.update(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> delete(@PathVariable Long id) {
        return appointmentService.delete(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }
}
