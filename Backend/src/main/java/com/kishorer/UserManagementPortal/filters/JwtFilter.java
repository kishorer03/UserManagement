package com.kishorer.UserManagementPortal.filters;

import com.kishorer.UserManagementPortal.UserInfo;
import com.kishorer.UserManagementPortal.repo.UserRepo;
import com.kishorer.UserManagementPortal.service.CustomUserDetailsService;
import com.kishorer.UserManagementPortal.service.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header=request.getHeader("Authorization");
        String token;
        String userName;
        if(header!=null && header.startsWith("Bearer ")){
            token=header.substring(7);
            userName=jwtUtils.getUserName(token);
            if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails=customUserDetailsService.loadUserByUsername(userName);
                if(jwtUtils.isValid(token,(UserInfo) userDetails)){
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }

            }
        }

        filterChain.doFilter(request,response);
    }
}
