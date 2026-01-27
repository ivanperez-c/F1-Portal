package es.uah.f1.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Deshabilita protección CSRF para pruebas Postman
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // Permite todo lo que empiece por /api/
                        .anyRequest().permitAll() // O permite absolutamente todo
                );

        return http.build();
    }
}