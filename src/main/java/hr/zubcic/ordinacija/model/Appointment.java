package hr.zubcic.ordinacija.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

//TODO complete later
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private AppointmentType appointmentType;

    @NotNull
    @Column(name = "schedule")
    private Date schedule;

    @Column(name = "description")
    private String description;

}
