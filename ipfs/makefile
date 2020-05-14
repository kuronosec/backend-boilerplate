include utils/meta.mk utils/help.mk

run: ##@local Run an IPFS instance locally
run:
	@docker run \
		-p 127.0.0.1:4001:4001 \
		-p 127.0.0.1:5001:5001 \
		-p 127.0.0.1:8080:8080 \
		$(IMAGE_NAME):latest

build-local: ##@local Build the docker image for local runs
build-local: ./Dockerfile
	@docker build \
		-t $(IMAGE_NAME):latest \
		.

build-docker: ##@devops Build the docker image
build-docker: ./Dockerfile
	@docker build \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(VERSION) \
		-t $(DOCKER_REGISTRY)/$(IMAGE_NAME):latest \
		.

push-image: ##@devops Push the freshly built image
push-image:
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME):latest
	@docker push $(DOCKER_REGISTRY)/$(IMAGE_NAME):$(VERSION)

build-kubernetes: ##@devops Generate proper k8s files based on the templates
build-kubernetes: ./k8s
	@rm -Rf $(K8S_BUILD_DIR) && mkdir -p $(K8S_BUILD_DIR)
	@for file in $(K8S_FILES); do \
		mkdir -p `dirname "$(K8S_BUILD_DIR)/$$file"`; \
		$(SHELL_EXPORT) envsubst <./k8s/$$file >$(K8S_BUILD_DIR)/$$file; \
	done

deploy-kubernetes: ##@devops Publish the build k8s files
deploy-kubernetes: $(K8S_BUILD_DIR)
	@for file in $(shell find $(K8S_BUILD_DIR) -name '*.yml' | sed 's:$(K8S_BUILD_DIR)/::g'); do \
		kubectl apply -f $(K8S_BUILD_DIR)/$$file --namespace=interx; \
	done
