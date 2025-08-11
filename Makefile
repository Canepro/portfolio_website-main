# Prefer podman, fallback to docker
ENGINE ?= $(shell (command -v podman >/dev/null 2>&1 && echo podman) || echo docker)
IMAGE  ?= ghcr.io/canepro/portfolio:dev
PORT   ?= 3000
NAME   ?= portfolio

.PHONY: info build run stop logs push clean

info:
	@echo "Using container engine: $(ENGINE)"
	@$(ENGINE) version

build:
	$(ENGINE) build -t $(IMAGE) .

run:
	$(ENGINE) run --rm -p $(PORT):3000 --name $(NAME) $(IMAGE)

stop:
	-$(ENGINE) stop $(NAME) || true

logs:
	$(ENGINE) logs -f $(NAME)

push:
	$(ENGINE) push $(IMAGE)

clean:
	-$(ENGINE) rm -f $(NAME) || true
	-$(ENGINE) rmi $(IMAGE) || true