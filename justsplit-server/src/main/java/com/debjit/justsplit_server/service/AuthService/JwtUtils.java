package com.debjit.justsplit_server.service.AuthService;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String getJwtFromCookies(HttpServletRequest request) {
        String jwt = "";
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("auth_token")) {
                    jwt = cookie.getValue();
                }
            }
        }
        logger.debug("JWT: {}", jwt);
        return jwt;
    }

    public String generateToken(String userEmail) {
        return Jwts.builder().setSubject(userEmail).setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs)).signWith(key()).compact();
    }

    public String getUserEmailFromJwtToken(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    public Date getExpiraionFromJwtToken(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    public boolean validateToken(String token) throws Exception {
        try {
            logger.info("Validating JWT: {}", token);
            return !isTokenExpired(token);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT Token. {}", e.getMessage());
            throw new Exception("Invalid JWT Token." + e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT Token. {}", e.getMessage());
            throw new Exception("Unsupported JWT Token." + e.getMessage());
        } catch (Exception e) {
            logger.error("Error occurred when validating JWT Token. {}", e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    public boolean isTokenExpired(String token) {
        return getExpiraionFromJwtToken(token).before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
}
