package com.example.demo.web;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.model.Note;
import com.example.demo.repo.NoteRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/notes")
public class NoteController {
	private final NoteRepository repo;
	
	public NoteController(NoteRepository repo) { this.repo = repo; }
	
	@GetMapping
	public List <Note> list() { return repo.findAll(); }
	
	@GetMapping("/{id}")
	public Note one (@PathVariable Long id) {
		return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Note create(@RequestBody Note n) {
		if (n.getTitle() == null || n.getTitle().isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"title is reqired");
		}
		n.setId(null);
		return repo.save(n);
	}
	
    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note n) {
        Note existing = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (n.getTitle() != null && !n.getTitle().isBlank()) existing.setTitle(n.getTitle());
        existing.setContent(n.getContent());
        return repo.save(existing);
    }
	
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        repo.deleteById(id);
    }
}