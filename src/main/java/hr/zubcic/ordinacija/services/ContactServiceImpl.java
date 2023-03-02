package hr.zubcic.ordinacija.services;

import hr.zubcic.ordinacija.model.ContactMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class ContactServiceImpl implements ContactService {

    private final JavaMailSender javaMailSender;

    public ContactServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public void sendEmail(ContactMessage contactMessage) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo("samo-kolnik.0f@icloud.com");
        helper.setFrom(contactMessage.getEmail());
        helper.setSubject(contactMessage.getSubject());
        helper.setText(contactMessage.getMessage());
        javaMailSender.send(message);
    };
}
