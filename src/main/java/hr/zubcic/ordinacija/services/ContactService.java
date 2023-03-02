package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.model.ContactMessage;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Optional;

@Service
public interface ContactService {

    void sendEmail(ContactMessage contactMessage) throws MessagingException;
}
