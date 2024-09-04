package com.kishorer.UserManagementPortal.service;

import com.kishorer.UserManagementPortal.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Component
@Scope
public class JwtUtils {
    private SecretKey secretKey;
    public JwtUtils(){
        try {
            KeyGenerator keyGenerator=KeyGenerator.getInstance("HmacSHA256");
            this.secretKey= keyGenerator.generateKey();
        } catch (NoSuchAlgorithmException e) {

        }
    }
    public String generateKey(String userName){
        return  Jwts.builder().subject(userName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String refreshGenerateKey(HashMap<String,Object> claims,String userName){
        return  Jwts.builder().claims(claims).subject(userName)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private SecretKey getKey(){
        return secretKey;
    }

    public String getUserName(String token){
        return getSpecificClaim(token,Claims::getSubject);
    }

    public <T> T getSpecificClaim(String token, Function<Claims,T> fun){
        Claims claims=getAllClaims(token);
        return fun.apply(claims);
    }

    public Claims getAllClaims(String token){
        return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
    }

    public Boolean isValid(String token,UserInfo userInfo){
        return (getUserName(token).equals(userInfo.getUsername()) && isTokenNotExpired(token));
    }

    public Boolean isTokenNotExpired(String token){
        return getSpecificClaim(token,Claims::getExpiration).after(new Date(System.currentTimeMillis())) ;
    }

}
