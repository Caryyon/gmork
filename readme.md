<p align="center">
  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FYTA7xSbXQkWJO%2Fgiphy.gif" alt="animated" />
</p>

# Gmork
This is a package I initially setup for the name. The Gmork is a fictional character from The Neverending Story books and movies.
The Gmork is depicted as a huge black wolf with glowing green eyes. It helps "The Nothing" in destroying our dream world.

### Wat?
This is a way for me to play around with making cli tools. I needed a safe place to just throw code around with out caring.
As this grows it may become something more and stabalize, but for now it is just hacking quick and fast.

### Goals

- [x] stay focused
- [x] setup env to build and bundle a cli tool
- [ ] carve out a way to make the architecture plugin based
- [ ] smoothly run other cli tools
- [ ] catch those errors gracefully
- [ ] link to the docs or issues on failures/errors


### Plugin Architecture

Ideally I want a easily plug n play solution for adding new features.
Something that will either wrap a function and then call it internally, or/and
some way to map over a directory and instantiate all the files within by name
