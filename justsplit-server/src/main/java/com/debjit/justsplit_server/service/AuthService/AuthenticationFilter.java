package com.debjit.justsplit_server.service.AuthService;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.debjit.justsplit_server.model.UserDTO;
import com.debjit.justsplit_server.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    // This class will extend OncePerRequestFilter, to just execute only once per
    // request
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        logger.debug("AuthenticationFilter called for URI: {}", request.getRequestURI());

        try {
            String jwt = parseJwt(request);
            if (jwt != null && !jwt.isEmpty() && jwtUtils.validateToken(jwt)) {
                String email = jwtUtils.getUserEmailFromJwtToken(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                // We are creating authentication token object with user details and roles
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // We are enriching the authentication token with additional details from the
                // request
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Setting the authentication token in security context
                SecurityContextHolder.getContext().setAuthentication(authentication);

                UserDTO userDTO = userService.getUserByEmail(email);

                // Setting user's email and id in the request object
                request.setAttribute("user_email", email);
                request.setAttribute("user_id", userDTO.getId());
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }

        logger.info("Continuing filter chain.");

        // Continue the filter chain as usual
        filterChain.doFilter(request, response);

    }

    private String parseJwt(HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request);
        logger.debug("AuthenticationFilter.java: {}", jwt);
        return jwt;
    }

}
