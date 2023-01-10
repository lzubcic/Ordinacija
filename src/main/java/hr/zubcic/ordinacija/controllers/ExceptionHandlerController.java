package hr.zubcic.ordinacija.controllers;

import hr.zubcic.ordinacija.services.exceptions.UsernameExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(UsernameExistsException.class)
    public ResponseEntity<String> handleUsernameExists() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Username already exists");
    }

}
