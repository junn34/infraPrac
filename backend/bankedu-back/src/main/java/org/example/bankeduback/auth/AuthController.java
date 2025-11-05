package org.example.bankeduback.auth;

import jakarta.servlet.http.HttpSession;
import org.example.bankeduback.auth.dto.LoginRequest;
import org.example.bankeduback.auth.dto.SignupRequest;
import org.example.bankeduback.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    public static final String LOGIN_USER = "LOGIN_USER";

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.ok().body("signup success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        log.info("🚀 로그인 요청 email={}", request.getEmail());
        try {
            User user = authService.login(request);
            log.info("✅ 로그인 성공: {}", user.getEmail());
            session.setAttribute(LOGIN_USER, user.getId());
            return ResponseEntity.ok(user.getEmail());
        } catch (Exception e) {
            log.error("❌ 로그인 중 예외 발생", e);
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Object userId = session.getAttribute(LOGIN_USER);
        if (userId == null) {
            return ResponseEntity.status(401).body("not logged in");
        }
        return ResponseEntity.ok().body(userId);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("logout");
    }
}
