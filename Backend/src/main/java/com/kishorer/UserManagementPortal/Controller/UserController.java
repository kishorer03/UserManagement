package com.kishorer.UserManagementPortal.Controller;


import com.kishorer.UserManagementPortal.Dto.ReqRes;
import com.kishorer.UserManagementPortal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/admin/register")
    public ReqRes register(@RequestBody ReqRes input){
        return userService.register(input);
    }

    @PostMapping("/auth/login")
    public ReqRes login(@RequestBody ReqRes input){
        return userService.login(input);
    }

    @PostMapping("/auth/refreshToken")
    public ReqRes refreshToken(@RequestBody ReqRes input){
        return userService.refreshToken(input);
    }

    @GetMapping("/admin/getAllUsers")
    public ReqRes getAllUsers(){
        return userService.getAll();
    }

    @GetMapping("/admin/getById/{id}")
    public ResponseEntity<ReqRes> getById(@PathVariable("id") int id){
        return ResponseEntity.ok(userService.getById(id));
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable("id") int id,@RequestBody ReqRes input){
        return ResponseEntity.ok(userService.updateUser(id,input));
    }

    @PostMapping("/adminuser/getProfile")
    public ReqRes getProfile(@RequestBody ReqRes input){
        return userService.getMyInfo(input.getEmail());
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<ReqRes> deleteProfile(@PathVariable("id") int id){
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
