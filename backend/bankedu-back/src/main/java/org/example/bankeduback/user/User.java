package org.example.bankeduback.user;

import jakarta.persistence.*;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 이메일 = 로그인 아이디
    @Column(nullable = false, length = 100)
    private String email;

    // 암호화된 비밀번호 저장
    @Column(nullable = false)
    private String password;

    // 이름(선택)
    private String name;

    // 권한
    @Column(nullable = false)
    private String role = "USER";

    protected User() {}

    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    // getter/setter

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) { this.password = password; }

    public String getName() {
        return name;
    }

    public void setName(String name) { this.name = name; }

    public String getRole() {
        return role;
    }

    public void setRole(String role) { this.role = role; }
}