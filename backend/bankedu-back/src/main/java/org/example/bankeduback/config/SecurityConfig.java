package org.example.bankeduback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration

public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // POST 테스트용으로 CSRF 끄기
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll() // 로그인/회원가입은 모두 허용
                        .anyRequest().permitAll()
                )
                .formLogin(form -> form.disable()) // 기본 로그인폼 제거
                .httpBasic(basic -> basic.disable()); // 기본 Basic 인증 제거

        return http.build();
    }
}
